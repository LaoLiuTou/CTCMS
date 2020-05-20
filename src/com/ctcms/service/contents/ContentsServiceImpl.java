package com.ctcms.service.contents;
import java.util.List;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import com.ctcms.dao.contents.IContentsMapper;
import com.ctcms.model.contents.Contents;
public class ContentsServiceImpl  implements IContentsService {

	@Autowired
	private IContentsMapper iContentsMapper;
	/**
	* 通过id选取
	* @return
	*/
	public Contents selectContentsById(String id){
		return iContentsMapper.selectcontentsById(id);
	}

	/**
	* 通过查询参数获取信息
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public List<Contents> selectContentsByParam(Map paramMap){ 
		return iContentsMapper.selectcontentsByParam(paramMap);
	}

	/**
	* 通过查询参数获取总条数
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountContentsByParam(Map paramMap){ 
		return iContentsMapper.selectCountcontentsByParam(paramMap);
	}

	/**
	* 更新 
	* @return 
	*/ 
	@Transactional
	public  int updateContents(Contents contents){
		return iContentsMapper.updatecontents(contents);
	}

	/**
	* 添加 
	* @return
	*/ 
	@Transactional
	public  int addContents(Contents contents){
		int result=0;
		if(contents.getType()!=null){
			String[] types=contents.getType().split(",");
			for(String type : types){
				contents.setType(type);
				iContentsMapper.addcontents(contents);
			} 
		}
		 
		
		return result;
	}

	/**
	* 批量添加 
	* @return
	*/ 
	@Transactional
	public  int muladdContents(List<Contents> list){
		return iContentsMapper.muladdcontents(list);
	}

	/**
	* 删除 
	* @return 
	*/ 
	@Transactional
	public  int deleteContents(String id){
		return iContentsMapper.deletecontents(id);
	}

}

