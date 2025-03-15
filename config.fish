if test -d "$HOME/.bun"
    # Add Bun to PATH for the current session
    set -gx BUN_INSTALL "$HOME/.bun"
    set -gx PATH "$BUN_INSTALL/bin" $PATH
end

# Optional: Add alias for common Bun commands
alias bunx="$HOME/.bun/bin/bun x"