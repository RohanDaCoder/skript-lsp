import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["**/*.test.ts", "**/*.spec.ts"],
        exclude: [
            "node_modules/**",
            "dist/**",
            "client/**",
            "server/dist/**",
            "test-data/**",
            "addon-parser/**",
        ],
        environment: "node",
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: [
                "node_modules/**",
                "dist/**",
                "client/**",
                "server/dist/**",
                "test-data/**",
                "addon-parser/**",
                "**/*.d.ts",
                "**/*.config.ts",
            ],
        },
    },
});
