package com.ctcms.service.logs;
import java.util.List;
import java.util.Map;
import com.ctcms.model.logs.Logs;
public interface ILogsService {
	/**
	* 通过id选取
	* @return
	*/
	public Logs selectLogsById(String id);

	/**
	* 通过查询参数获取信息
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public List<Logs> selectLogsByParam(Map paramMap); 

	/**
	* 通过查询参数获取总条数
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountLogsByParam(Map paramMap); 

	/**
	* 更新 
	* @return 
	*/ 
	public int updateLogs(Logs logs);

	/**
	* 添加 
	* @return
	*/ 
	public int addLogs(Logs logs);

	/**
	* 批量添加 
	* @return
	*/ 
	public int muladdLogs(List<Logs> list);

	/**
	* 删除 
	* @return 
	*/ 
	public int deleteLogs(String id);

}

