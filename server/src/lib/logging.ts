import kleur from 'kleur';

export class Logging {
  public static log = (args: any) => this.info(args);
  public static info = (args: any) =>
    console.log(
      kleur.bgBlue(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === 'string' ? kleur.blue(args) : args
    );

  public static warn = (args: any) =>
    console.log(
      kleur.bgYellow(`[${new Date().toLocaleString()}] [WARN]`),
      typeof args === 'string' ? kleur.yellow(args) : args
    );

  public static error = (args: any) =>
    console.log(
      kleur.bgRed(`[${new Date().toLocaleString()}] [ERROR]`),
      typeof args === 'string' ? kleur.red(args) : args
    );
}
