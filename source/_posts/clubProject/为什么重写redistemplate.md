---
title: 为什么重写redisTemplate
date: 2024-3-8
updated: 2024-3-8
categories: "Redis"
tags: 
  - "Redis"
  - "redisTemplate"
---

# 为什么重写`redisTemplate`

## 存入`Redis`中的数据很大情况下是带有乱码的，为什么呢？

> 因为默认存入采用的序列化时`JDK`中序列化器，所以我们需要改变原本的序列化器。

```java
/**
 * Redis config处理
 *
 * @author flyone
 * @date 2024/3/8
 */
@Configuration
public class RedisConfig {
    /**
     * RedisTemplate配置
     * 目的 为了替代原有的redisTemplate
     * @param redisConnectionFactory redis连接工厂
     * @return RedisTemplate
     */
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        // 更改序列化器
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        // 设置 key 的序列化器
        redisTemplate.setKeySerializer(redisSerializer);
        // 设置 hashKey 的序列化器
        redisTemplate.setHashKeySerializer(redisSerializer);
        // 设置 value 的序列化器
        redisTemplate.setValueSerializer(jackson2JsonRedisSerializer());
        // 设置 hashValue 的序列化器
        redisTemplate.setHashValueSerializer(jackson2JsonRedisSerializer());
        return redisTemplate;
    }

    /**
     * Jackson2JsonRedisSerializer配置
     * @return Jackson2JsonRedisSerializer
     */
    private Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer() {
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(Object.class);
        ObjectMapper objectMapper = new ObjectMapper();
        // 设置可见度
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        // 启用默认类型
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL, JsonTypeInfo.As.PROPERTY);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);
        return jackson2JsonRedisSerializer;
    }
}
```

