package ru.solidtech.website.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

/**
 * Утилитный класс для работы с JSON Web Token (JWT).
 * Этот класс предоставляет методы для создания, парсинга и проверки JWT.
 */
@Component
@Slf4j
public class JwtUtil {

    // Ключ для подписи JWT
    private final SecretKey secretKey;


    public JwtUtil(@Value("${jwt.secret}") String secret) {
        try {
            log.info("JWT Secret: {}", secret);
            byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
            this.secretKey = Keys.hmacShaKeyFor(keyBytes);
            log.info("SecretKey created successfully: {}", secretKey);
        } catch (Exception e) {
            log.error("Failed to create SecretKey from JWT secret", e);
            throw new RuntimeException("Invalid JWT secret", e);
        }
    }
    /**
     * Извлекает имя пользователя из JWT токена.
     *
     * @param token JWT токен
     * @return имя пользователя, извлеченное из токена
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Извлекает дату истечения срока действия токена.
     *
     * @param token JWT токен
     * @return дата истечения срока действия токена
     */
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Извлекает конкретное требуемое утверждение (claim) из JWT токена.
     *
     * @param token JWT токен
     * @param claimsResolver функция для получения утверждения
     * @param <T> тип утверждения
     * @return извлеченное утверждение
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Извлекает все данные (claims) из JWT токена.
     *
     * @param token JWT токен
     * @return все утверждения, извлеченные из токена
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
    }

    /**
     * Проверяет, истек ли срок действия JWT токена.
     *
     * @param token JWT токен
     * @return {@code true}, если токен истек, {@code false} в противном случае
     */
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Генерирует новый JWT токен для указанного имени пользователя и ролей.
     *
     * @param username имя пользователя
     * @param roles список ролей пользователя
     * @return сгенерированный JWT токен
     */
    public String generateToken(String username, List<String> roles) {
        return createToken(username, roles);
    }

    /**
     * Создает JWT токен с указанным именем пользователя и ролями.
     *
     * @param subject имя пользователя
     * @param roles список ролей пользователя
     * @return созданный JWT токен
     */
    private String createToken(String subject, List<String> roles) {
        return Jwts.builder()
                .setSubject(subject)
                .claim("roles", roles)  // Добавляем роли в утверждения токена
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))  // Срок действия 10 часов
                .signWith(secretKey, SignatureAlgorithm.HS256)  // Подпись токена
                .compact();
    }
    /**
     * Проверяет, действителен ли токен (без проверки имени пользователя).
     *
     * @param token JWT токен
     * @return {@code true}, если токен действителен и не истёк
     */
    public Boolean validateToken(String token) {
        try {
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }


    /**
     * Извлекает роли из JWT токена.
     *
     * @param token JWT токен
     * @return список ролей, извлеченных из токена
     */
    public List<String> extractRoles(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("roles", List.class);
    }
}