package com.example.playfarmb.common.config;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;



//@Configuration
//@MapperScan("com.example.playfarmb.mapperInterface")
//public class MyBatisConfig {
//
//	@Bean // 스프링 빈으로 등록
// 	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
// 	
// 		// 1. SqlSessionFactoryBean 객체 생성
// 		SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean(); 
// 	
// 		// 2. DataSource 설정, 매퍼 파일 위치 설정
// 		sessionFactory.setDataSource(dataSource); 
// 		Resource[] res = new PathMatchingResourcePatternResolver().getResources("classpath:mapper/*Mapper.xml"); //  XML 매퍼 파일들의 위치를 찾아 배열로 저장
// 		sessionFactory.setMapperLocations(res); 
//// 		sessionFactory.setDataSource(dataSource); 
// 
// 		// 3. 생성된 SqlSessionFactory 객체 반환
// 		return sessionFactory.getObject(); 
// 	}
//}
@Configuration
@MapperScan(basePackages={"com.example.playfarmb.mapperInterface"}, sqlSessionFactoryRef="sqlSessionFactory",sqlSessionTemplateRef = "sqlSessionTemplate")
public class MyBatisConfig {


    @Bean(name="sqlSessionFactory")
    public SqlSessionFactory sqlSessionFactory(@Qualifier("dataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setTypeAliasesPackage("com.example.playfarmb");
        sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/mapper/*.xml"));
        return sqlSessionFactoryBean.getObject();
    }

}