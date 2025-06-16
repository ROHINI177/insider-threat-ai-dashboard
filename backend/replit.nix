{ pkgs }: {
  deps = [
    pkgs.python311Full
    pkgs.uvicorn
    pkgs.sqlite
  ];
}
