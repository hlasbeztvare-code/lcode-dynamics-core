import type { EventContext } from '@cloudflare/workers-types';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

interface Env {
  LEADS_WEBHOOK_URL?: string;
  DATABASE_URL?: string;
}

interface LeadBody {
  name?: string;
  email: string;
  company?: string;
  message?: string;
}

export const onRequestPost = async (ctx: EventContext<Env, string, Record<string, unknown>>) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body = await ctx.request.json() as LeadBody;
    const { name, email, company, message } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Neplatný e-mail.' }), { status: 400, headers: corsHeaders });
    }

    // Prisma Edge DB Storage
    if (ctx.env.DATABASE_URL) {
      const prisma = new PrismaClient({
        datasourceUrl: ctx.env.DATABASE_URL
      }).$extends(withAccelerate());

      try {
        await prisma.lead.create({
          data: {
            email,
            name,
            company,
            status: 'NEW',
          },
        });
      } catch (dbError) {
        console.error('Chyba při ukládání leadu do DB:', dbError);
        // Nechceme zastavit celou funkci, pokud spadne jen DB. Discord webhook by měl odejít.
      }
    }

    // Discord webhook notification
    const webhookUrl = ctx.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **Nový Lead z webu L-Code Dynamics!**\n**Od:** ${name || 'Anonym'} (${email})${company ? `\n**Firma:** ${company}` : ''}\n**Zpráva:**\n\`\`\`${message || '—'}\`\`\``,
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Interní chyba serveru v leads.ts:', error);
    return new Response(JSON.stringify({ error: 'Interní chyba serveru.' }), { status: 500, headers: corsHeaders });
  }
};

export const onRequestOptions = () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
