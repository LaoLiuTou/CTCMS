package com.ctcms.service.opinions;
import java.util.List;
import java.util.Map;
import com.ctcms.model.opinions.Opinions;
public interface IOpinionsService {
	/**
	* 通过id选取
	* @return
	*/
	public Opinions selectOpinionsById(String id);

	/**
	* 通过查询参数获取信息
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public List<Opinions> selectOpinionsByParam(Map paramMap); 

	/**
	* 通过查询参数获取总条数
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountOpinionsByParam(Map paramMap); 

	/**
	* 更新 
	* @return 
	*/ 
	public int updateOpinions(Opinions opinions);

	/**
	* 添加 
	* @return
	*/ 
	public int addOpinions(Opinions opinions);

	/**
	* 批量添加 
	* @return
	*/ 
	public int muladdOpinions(List<Opinions> list);

	/**
	* 删除 
	* @return 
	*/ 
	public int deleteOpinions(String id);

}

