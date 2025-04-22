import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve static files from the React build directory
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Forward all unmatched routes to React's index.html
        registry.addViewController("/{spring:[a-zA-Z0-9-_]+}")
                .setViewName("forward:/index.html");
        registry.addViewController("/**/{spring:[a-zA-Z0-9-_]+}")
                .setViewName("forward:/index.html");
        registry.addViewController("/{spring:[a-zA-Z0-9-_]+}/**")
                .setViewName("forward:/index.html");
    }
}
