package com.ctcms.dao.logs;
import java.util.List;
import java.util.Map;
import com.ctcms.model.logs.Logs;
	public interface ILogsMapper {
	/**
 	* 通过id选取
 	* @return
 	*/
	public Logs selectlogsById(String id);
	/**
 	* 通过查询参数获取信息
 	* @return
 */ 
 @SuppressWarnings("rawtypes")
	public List<Logs> selectlogsByParam(Map paramMap); 
	/**
		* 通过查询参数获取总条数
	    * @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountlogsByParam(Map paramMap); 
	/**
 	* 更新 
 	* @return 
 */ 
	public  int updatelogs(Logs logs);
	/**
 	* 添加 
 	* @return
 */ 
	public  int addlogs(Logs logs);
	/**
 	* 批量添加 
 	* @return
 */ 
	public  int muladdlogs(List<Logs> list);
	/**
 	* 删除 
 	* @return 
 */ 
public  int deletelogs(String id);

}

