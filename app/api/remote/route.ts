import { transform } from "esbuild";

const JSX = `export default function DynamicJsx() {
  return <div className="m-4 content-center rounded-xl border p-4 text-center text-5xl">Hello, world!</div>;
}
`;

export async function GET() {
  const { code } = await transform(JSX, {
    loader: "jsx",
    jsx: "automatic", // no need to import React
    format: "esm",
    target: ["es2020"], // required for Dynamic Imports
    sourcemap: process.env.NODE_ENV === "development" ? "inline" : false,
    minify: process.env.NODE_ENV === "production",
  });

  const headers = new Headers({
    "Content-Type": "text/javascript; charset=utf-8",
  });

  return new Response(code, { status: 200, headers });
}
