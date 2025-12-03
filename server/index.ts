import { env } from "./env";

async function getRecordCount(): Promise<number> {
  let count = 0;
  let offset: string | undefined;

  do {
    const url = new URL(
      `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE_NAME)}`
    );
    url.searchParams.set("pageSize", "100");
    if (offset) {
      url.searchParams.set("offset", offset);
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      records: unknown[];
      offset?: string;
    };
    count += data.records.length;
    offset = data.offset;
  } while (offset);

  return count;
}

const server = Bun.serve({
  port: env.PORT ? parseInt(env.PORT) : 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/count" && req.method === "GET") {
      try {
        const count = await getRecordCount();
        return Response.json({ count });
      } catch (error) {
        return Response.json(
          { error: error instanceof Error ? error.message : "Unknown error" },
          { status: 500 }
        );
      }
    }

    return Response.json({ error: "Not found" }, { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
