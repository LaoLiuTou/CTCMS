package com.ctcms.service.messages;
import java.util.List;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import com.ctcms.dao.messages.IMessagesMapper;
import com.ctcms.model.messages.Messages;
public class MessagesServiceImpl  implements IMessagesService {

	@Autowired
	private IMessagesMapper iMessagesMapper;
	/**
	* 通过id选取
	* @return
	*/
	public Messages selectMessagesById(String id){
		return iMessagesMapper.selectmessagesById(id);
	}

	/**
	* 通过查询参数获取信息
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public List<Messages> selectMessagesByParam(Map paramMap){ 
		return iMessagesMapper.selectmessagesByParam(paramMap);
	}

	/**
	* 通过查询参数获取总条数
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountMessagesByParam(Map paramMap){ 
		return iMessagesMapper.selectCountmessagesByParam(paramMap);
	}

	/**
	* 更新 
	* @return 
	*/ 
	@Transactional
	public  int updateMessages(Messages messages){
		return iMessagesMapper.updatemessages(messages);
	}

	/**
	* 添加 
	* @return
	*/ 
	@Transactional
	public  int addMessages(Messages messages){
		return iMessagesMapper.addmessages(messages);
	}

	/**
	* 批量添加 
	* @return
	*/ 
	@Transactional
	public  int muladdMessages(List<Messages> list){
		return iMessagesMapper.muladdmessages(list);
	}

	/**
	* 删除 
	* @return 
	*/ 
	@Transactional
	public  int deleteMessages(String id){
		return iMessagesMapper.deletemessages(id);
	}

}

