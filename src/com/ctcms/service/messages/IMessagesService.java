package com.ctcms.service.messages;
import java.util.List;
import java.util.Map;
import com.ctcms.model.messages.Messages;
public interface IMessagesService {
	/**
	* 通过id选取
	* @return
	*/
	public Messages selectMessagesById(String id);

	/**
	* 通过查询参数获取信息
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public List<Messages> selectMessagesByParam(Map paramMap); 

	/**
	* 通过查询参数获取总条数
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountMessagesByParam(Map paramMap); 

	/**
	* 更新 
	* @return 
	*/ 
	public int updateMessages(Messages messages);

	/**
	* 添加 
	* @return
	*/ 
	public int addMessages(Messages messages);

	/**
	* 批量添加 
	* @return
	*/ 
	public int muladdMessages(List<Messages> list);

	/**
	* 删除 
	* @return 
	*/ 
	public int deleteMessages(String id);

}

