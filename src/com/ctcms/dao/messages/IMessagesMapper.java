package com.ctcms.dao.messages;
import java.util.List;
import java.util.Map;
import com.ctcms.model.messages.Messages;
	public interface IMessagesMapper {
	/**
 	* 通过id选取
 	* @return
 	*/
	public Messages selectmessagesById(String id);
	/**
 	* 通过查询参数获取信息
 	* @return
 */ 
 @SuppressWarnings("rawtypes")
	public List<Messages> selectmessagesByParam(Map paramMap); 
	/**
		* 通过查询参数获取总条数
	    * @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountmessagesByParam(Map paramMap); 
	/**
 	* 更新 
 	* @return 
 */ 
	public  int updatemessages(Messages messages);
	/**
 	* 添加 
 	* @return
 */ 
	public  int addmessages(Messages messages);
	/**
 	* 批量添加 
 	* @return
 */ 
	public  int muladdmessages(List<Messages> list);
	/**
 	* 删除 
 	* @return 
 */ 
public  int deletemessages(String id);

}

