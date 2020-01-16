package com.ctcms.service.opinions;
import java.util.List;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import com.ctcms.dao.opinions.IOpinionsMapper;
import com.ctcms.model.opinions.Opinions;
public class OpinionsServiceImpl  implements IOpinionsService {

	@Autowired
	private IOpinionsMapper iOpinionsMapper;
	/**
	* 通过id选取
	* @return
	*/
	public Opinions selectOpinionsById(String id){
		return iOpinionsMapper.selectopinionsById(id);
	}

	/**
	* 通过查询参数获取信息
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public List<Opinions> selectOpinionsByParam(Map paramMap){ 
		return iOpinionsMapper.selectopinionsByParam(paramMap);
	}

	/**
	* 通过查询参数获取总条数
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountOpinionsByParam(Map paramMap){ 
		return iOpinionsMapper.selectCountopinionsByParam(paramMap);
	}

	/**
	* 更新 
	* @return 
	*/ 
	@Transactional
	public  int updateOpinions(Opinions opinions){
		return iOpinionsMapper.updateopinions(opinions);
	}

	/**
	* 添加 
	* @return
	*/ 
	@Transactional
	public  int addOpinions(Opinions opinions){
		return iOpinionsMapper.addopinions(opinions);
	}

	/**
	* 批量添加 
	* @return
	*/ 
	@Transactional
	public  int muladdOpinions(List<Opinions> list){
		return iOpinionsMapper.muladdopinions(list);
	}

	/**
	* 删除 
	* @return 
	*/ 
	@Transactional
	public  int deleteOpinions(String id){
		return iOpinionsMapper.deleteopinions(id);
	}

}

