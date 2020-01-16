package com.ctcms.dao.opinions;
import java.util.List;
import java.util.Map;
import com.ctcms.model.opinions.Opinions;
	public interface IOpinionsMapper {
	/**
 	* 通过id选取
 	* @return
 	*/
	public Opinions selectopinionsById(String id);
	/**
 	* 通过查询参数获取信息
 	* @return
 */ 
 @SuppressWarnings("rawtypes")
	public List<Opinions> selectopinionsByParam(Map paramMap); 
	/**
		* 通过查询参数获取总条数
	    * @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountopinionsByParam(Map paramMap); 
	/**
 	* 更新 
 	* @return 
 */ 
	public  int updateopinions(Opinions opinions);
	/**
 	* 添加 
 	* @return
 */ 
	public  int addopinions(Opinions opinions);
	/**
 	* 批量添加 
 	* @return
 */ 
	public  int muladdopinions(List<Opinions> list);
	/**
 	* 删除 
 	* @return 
 */ 
public  int deleteopinions(String id);

}

