package com.example.playfarmb.mapperInterface;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.playfarmb.admin.common.domain.AdminCodeVO;

@Mapper
public interface CodeMapper {
	public List<AdminCodeVO> findCodeList(@Param("codeDv") String codeDv);
}
