import { NuxtAuthHandler } from "#auth";
import DiscordProvider from "next-auth/providers/discord";

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    DiscordProvider.default({
      clientId: runtimeConfig.discord.clientId,
      clientSecret: runtimeConfig.discord.clientSecret,
    }),
  ],
});
