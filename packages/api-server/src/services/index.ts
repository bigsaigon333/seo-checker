import { Browser, BrowserWindow } from "happy-dom";
import {
  GoogleSearchConsoleRegistrationRule,
  NaverSearchAdvisorRegistrationRule,
  Result,
  Rule,
} from "./rules.js";

export async function parse(url: string): Promise<Result[]> {
  const window = await init(url);
  const rules: Rule[] = [
    new NaverSearchAdvisorRegistrationRule(),
    new GoogleSearchConsoleRegistrationRule(),
  ];

  return execute(window, rules);
}

async function init(url: string): Promise<Readonly<BrowserWindow>> {
  const browser = new Browser();
  const context = browser.newIncognitoContext();
  const page = context.newPage();

  await page.goto(url);

  return page.mainFrame.window;
}

function execute(window: Readonly<BrowserWindow>, rules: Rule[]): Result[] {
  return rules.map((rule) => rule.execute(window));
}
