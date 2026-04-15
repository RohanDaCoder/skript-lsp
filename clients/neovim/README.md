# IntelliSkript Neovim Client

Neovim client configuration for [IntelliSkript](https://github.com/RohanDaCoder/skript-lsp) language server.

## Requirements

- Neovim 0.8+
- [lspconfig](https://github.com/neovim/nvim-lspconfig)
- [mason.nvim](https://github.com/williamboman/mason.nvim) (optional, for auto-install)

## Installation

### Using lazy.nvim

```lua
-- ~/.config/nvim/lua/plugins/skript.lua
return {
    "RohanDaCoder/skript-lsp",
    lazy = true,
    ft = { "sk", "skript" },
    config = function()
        require("intelliskript").config()
    end,
}
```

### Or with manual LSP setup

```lua
-- ~/.config/nvim/init.lua
local lspconfig = require("lspconfig")

lspconfig.intelliskript.setup({
    cmd = { "node", vim.fn.stdpath("data") .. "/lazy/skript-lsp/server/dist/nodeServerMain.js" },
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
})
```

## Configuration

### Config File

Create a `.skriptrc.json` in your Skript project root:

```json
{
  "minecraftVersion": "1.20.4",
  "skriptVersion": "2.9",
  "addons": ["skript-mirror", "skRayFall"],
  "syntax": {
    "source": "local",
    "path": "./syntax.json"
  }
}
```

### Keybindings

| Keybinding | Action |
|------------|--------|
| `gd` | Go to definition |
| `gr` | Find references |
| `K` | Hover |
| `<leader>ca` | Code actions |

## Features

- ✅ Autocomplete
- ✅ Hover information
- ✅ Go to definition
- ✅ Find references
- ✅ Semantic tokens
- ✅ Syntax-based completions from SkriptHub
- ✅ Configurable filtering by Minecraft version, addons

## License

MIT
