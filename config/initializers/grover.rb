Grover.configure do |config|
  config.options = {
    format: 'A4',
    launch_args: ['--no-sandbox', '--font-render-hinting=medium'],
    viewport: {
      width: 1920,
      height: 1080,
    },
    emulate_media: 'screen',
    scale: 0.75,
  }


end
