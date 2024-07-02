import { BrowserWindow } from "happy-dom";

export const enum Level {
  Good = "Good",
  Neutral = "Neutral",
  NeedsImprovement = "Needs Improvement",
}

export type Result = {
  name: string;
  level: Level;
  description: string | null;
};

export type Rule = {
  name: string;
  execute(window: Readonly<BrowserWindow>): Result;
};

export class NaverSearchAdvisorRegistrationRule implements Rule {
  name = "Naver SearchAdvisor 등록";
  execute(window: BrowserWindow): Result {
    const element = window.document.documentElement.querySelector(
      "meta[name=naver-site-verification]"
    );

    if (element == null) {
      return {
        name: this.name,
        level: Level.NeedsImprovement,
        description: "naver-site-verification 를 추가해주세요",
      };
    }

    return {
      name: this.name,
      level: Level.Good,
      description: `${element.getAttribute("content")}로 잘 설정되어 있습니다.`,
    };
  }
}

export class GoogleSearchConsoleRegistrationRule implements Rule {
  name = "Google SearchConsole 등록";

  execute(window: BrowserWindow): Result {
    const element = window.document.documentElement.querySelector(
      "meta[name=google-site-verification]"
    );

    if (element == null) {
      return {
        name: this.name,
        level: Level.NeedsImprovement,
        description: "google-site-verification 를 추가해주세요",
      };
    }

    return {
      name: this.name,
      level: Level.Good,
      description: `${element.getAttribute("content")}로 잘 설정되어 있습니다.`,
    };
  }
}
