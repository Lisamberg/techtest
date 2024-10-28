import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./infrastructure/common/filter/exception.filter";
import { LoggerService } from "./infrastructure/logger/logger.service";
import {
    ResponseFormat,
    ResponseInterceptor,
} from "./infrastructure/common/interceptor/response.interceptor";
import { LoggingInterceptor } from "./infrastructure/common/interceptor/logger.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin:
            "production" === process.env.NODE_ENV &&
            process.env.CORS_WHITELISTED_ORIGINS !== "*"
                ? process.env.CORS_WHITELISTED_ORIGINS.split(",")
                : true,
    });

    app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

    // interceptors
    app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
    app.useGlobalInterceptors(new ResponseInterceptor());

    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle("MyDiabby tech test")
        .setDescription("User crud")
        .setVersion("1")
        .build();

    const document = SwaggerModule.createDocument(app, config, {
        extraModels: [ResponseFormat],
        deepScanRoutes: true,
    });
    SwaggerModule.setup("api", app, document);
    await app.listen(3000);
}
bootstrap();
