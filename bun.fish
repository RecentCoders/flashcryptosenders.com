function bun --description 'Bun runtime & toolkit'
    set --export BUN_INSTALL "$HOME/.bun"
    set --export PATH $BUN_INSTALL/bin $PATH
    command bun $argv
end
