package com.ctcms.service.contents;
import java.util.List;
import java.util.Map;
import com.ctcms.model.contents.Contents;
public interface IContentsService {
	/**
	* 通过id选取
	* @return
	*/
	public Contents selectContentsById(String id);

	/**
	* 通过查询参数获取信息
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public List<Contents> selectContentsByParam(Map paramMap); 

	/**
	* 通过查询参数获取总条数
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountContentsByParam(Map paramMap); 

	/**
	* 更新 
	* @return 
	*/ 
	public int updateContents(Contents contents);

	/**
	* 添加 
	* @return
	*/ 
	public int addContents(Contents contents);

	/**
	* 批量添加 
	* @return
	*/ 
	public int muladdContents(List<Contents> list);

	/**
	* 删除 
	* @return 
	*/ 
	public int deleteContents(String id);

}

