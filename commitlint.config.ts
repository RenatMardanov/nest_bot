const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Новая функциональность
        "fix", // Исправление ошибок
        "docs", // Документация
        "style", // Стили и форматирование
        "refactor", // Рефакторинг кода
        "perf", // Улучшения производительности
        "test", // Тесты
        "chore", // Обслуживание
        "revert", // Откат изменений
        "ci", // CI/CD изменения
        "build", // Сборка
      ],
    ],
  },
};

export default Configuration;
