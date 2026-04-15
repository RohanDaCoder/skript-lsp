-- Mason.nvim integration example
-- Add this to your Mason setup

require("mason").setup({
    ui = {
        icons = {
            package_installed = "✓",
            package_pending = "➜",
            package_uninstalled = "✗",
        },
    },
})

require("mason-lspconfig").setup({
    handlers = {
        function(server_name)
            require("lspconfig")[server_name].setup({
                on_attach = function(client, bufnr)
                    vim.api.nvim_buf_set_option(bufnr, "omnifunc", "v:lua.vim.lsp.omnifunc")
                end,
            })
        end,
        ["intelliskript"] = function()
            require("lspconfig").intelliskript.setup({
                cmd = { "node", vim.fn.stdpath("data") .. "/lazy/skript-lsp/server/dist/nodeServerMain.js" },
                filetypes = { "sk", "skript" },
            })
        end,
    },
})
