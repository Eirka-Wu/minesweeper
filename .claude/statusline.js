const chunks = [];
process.stdin.on('data', d => chunks.push(d));
process.stdin.on('end', () => {
  try {
    const d = JSON.parse(Buffer.concat(chunks).toString());
    const cwd = d.cwd || process.cwd();
    const model = d.model?.display_name || 'unknown';
    const percentage = d.context_window?.remaining_percentage ?? '--';
    process.stdout.write(`${cwd} | ${model} | ${percentage}%`);
  } catch (e) {
    process.stdout.write(`${process.cwd()} | unknown | --%`);
  }
});
