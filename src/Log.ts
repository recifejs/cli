class Log {
  private static _instance: Log;
  private infoOld: string;
  private colors = {
    reset: '\x1b[0m',
    fgBlack: '\x1b[30m',
    fgBlue: '\x1b[34m',
    fgGreen: '\x1b[32m',
    fgCyan: '\x1b[36m',
    fgYellow: '\x1b[33m',
    fgRed: '\x1b[31m',
    bgBlue: '\x1b[44m',
    bgRed: '\x1b[41m',
    bgYellow: '\x1b[43m',
    bgWhite: '\x1b[47m'
  };

  private constructor() {
    this.infoOld = '';
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  infoHeap(text: string) {
    if (this.infoOld !== '') {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    }

    process.stdout.write(`${this.colors.fgBlue}ℹ${this.colors.reset} ${text}`);
    this.infoOld = text;
  }

  successHeap(text: string) {
    if (this.infoOld !== '') {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    }

    process.stdout.write(
      `${this.colors.fgGreen}✓${this.colors.reset} ${text}\n`
    );
    this.infoOld = text;
  }

  errorHeap(text: string) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`${this.colors.fgRed}☓${this.colors.reset} ${text}\n`);
  }

  jump() {
    process.stdout.write(`\n`);
  }

  title(text: string) {
    process.stdout.write(
      `\n${this.colors.bgWhite}${
        this.colors.fgBlue
      } ⚬ ${text.toUpperCase()} ⚬ ${this.colors.reset}\n\n`
    );
  }

  info(text: string) {
    process.stdout.write(
      `\n${this.colors.fgCyan}⚬${this.colors.reset} ${text}`
    );
  }

  exception(text: string) {
    process.stdout.write(`\n${this.colors.fgRed}☓${this.colors.reset} ${text}`);
    process.exit(1);
  }
}

export default Log;
