import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    css: ['@/assets/styles/main.scss'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/assets/styles/_variables.scss";'
                }
            }
        },
    },
};

export default nextConfig;
