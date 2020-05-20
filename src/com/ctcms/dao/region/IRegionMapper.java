package com.ctcms.dao.region;
import java.util.List;
import java.util.Map;
import com.ctcms.model.region.Region;
	public interface IRegionMapper {
	/**
 	* 通过id选取
 	* @return
 	*/
	public Region selectregionById(String id);
	/**
 	* 通过查询参数获取信息
 	* @return
 */ 
 @SuppressWarnings("rawtypes")
	public List<Region> selectregionByParam(Map paramMap); 
 	public List<Region> statisregion(); 
	/**
		* 通过查询参数获取总条数
	    * @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountregionByParam(Map paramMap); 
	/**
 	* 更新 
 	* @return 
 */ 
	public  int updateregion(Region region);
	/**
 	* 添加 
 	* @return
 */ 
	public  int addregion(Region region);
	/**
 	* 批量添加 
 	* @return
 */ 
	public  int muladdregion(List<Region> list);
	/**
 	* 删除 
 	* @return 
 */ 
public  int deleteregion(String id);

}

