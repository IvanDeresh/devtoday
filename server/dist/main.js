"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const port = config.get('PORT') || 3001;
    app.enableCors();
    await app.listen(port);
    console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map