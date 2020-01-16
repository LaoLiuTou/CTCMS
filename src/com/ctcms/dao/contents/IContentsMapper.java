package com.ctcms.dao.contents;
import java.util.List;
import java.util.Map;
import com.ctcms.model.contents.Contents;
	public interface IContentsMapper {
	/**
 	* 通过id选取
 	* @return
 	*/
	public Contents selectcontentsById(String id);
	/**
 	* 通过查询参数获取信息
 	* @return
 */ 
 @SuppressWarnings("rawtypes")
	public List<Contents> selectcontentsByParam(Map paramMap); 
	/**
		* 通过查询参数获取总条数
	    * @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountcontentsByParam(Map paramMap); 
	/**
 	* 更新 
 	* @return 
 */ 
	public  int updatecontents(Contents contents);
	/**
 	* 添加 
 	* @return
 */ 
	public  int addcontents(Contents contents);
	/**
 	* 批量添加 
 	* @return
 */ 
	public  int muladdcontents(List<Contents> list);
	/**
 	* 删除 
 	* @return 
 */ 
public  int deletecontents(String id);

}

