local M = {}

M.opts = {
    cmd = { "node", vim.fn.stdpath("data") .. "/lazy/intelliskript/server/dist/nodeServerMain.js" },
    filetypes = { "sk", "skript" },
    settings = {
        IntelliSkript = {
            ErrorExempts = "",
            UseColorTheme = true,
        },
    },
    on_attach = function(client, bufnr)
        vim.api.nvim_buf_set_option(bufnr, "omnifunc", "v:lua.vim.lsp.omnifunc")

        local buf_map = function(mode, lhs, rhs)
            local opts = { noremap = true, silent = true, buffer = bufnr }
            vim.keymap.set(mode, lhs, rhs, opts)
        end

        buf_map("n", "gd", vim.lsp.buf.definition)
        buf_map("n", "gr", vim.lsp.buf.references)
        buf_map("n", "K", vim.lsp.buf.hover)
        buf_map("n", "<leader>ca", vim.lsp.buf.code_action)
    end,
}

M.config = function()
    local lspconfig = require("lspconfig")

    lspconfig.intelliskript.setup(M.opts)
end

return M
