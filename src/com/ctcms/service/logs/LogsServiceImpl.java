package com.ctcms.service.logs;
import java.util.List;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import com.ctcms.dao.logs.ILogsMapper;
import com.ctcms.model.logs.Logs;
public class LogsServiceImpl  implements ILogsService {

	@Autowired
	private ILogsMapper iLogsMapper;
	/**
	* 通过id选取
	* @return
	*/
	public Logs selectLogsById(String id){
		return iLogsMapper.selectlogsById(id);
	}

	/**
	* 通过查询参数获取信息
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public List<Logs> selectLogsByParam(Map paramMap){ 
		return iLogsMapper.selectlogsByParam(paramMap);
	}

	/**
	* 通过查询参数获取总条数
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountLogsByParam(Map paramMap){ 
		return iLogsMapper.selectCountlogsByParam(paramMap);
	}

	/**
	* 更新 
	* @return 
	*/ 
	@Transactional
	public  int updateLogs(Logs logs){
		return iLogsMapper.updatelogs(logs);
	}

	/**
	* 添加 
	* @return
	*/ 
	@Transactional
	public  int addLogs(Logs logs){
		return iLogsMapper.addlogs(logs);
	}

	/**
	* 批量添加 
	* @return
	*/ 
	@Transactional
	public  int muladdLogs(List<Logs> list){
		return iLogsMapper.muladdlogs(list);
	}

	/**
	* 删除 
	* @return 
	*/ 
	@Transactional
	public  int deleteLogs(String id){
		return iLogsMapper.deletelogs(id);
	}

}

