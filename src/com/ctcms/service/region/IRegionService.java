package com.ctcms.service.region;
import java.util.List;
import java.util.Map;
import com.ctcms.model.region.Region;
public interface IRegionService {
	/**
	* 通过id选取
	* @return
	*/
	public Region selectRegionById(String id);

	/**
	* 通过查询参数获取信息
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public List<Region> selectRegionByParam(Map paramMap); 
	public List<Region> statisRegion(); 

	/**
	* 通过查询参数获取总条数
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountRegionByParam(Map paramMap); 

	/**
	* 更新 
	* @return 
	*/ 
	public int updateRegion(Region region);

	/**
	* 添加 
	* @return
	*/ 
	public int addRegion(Region region);

	/**
	* 批量添加 
	* @return
	*/ 
	public int muladdRegion(List<Region> list);

	/**
	* 删除 
	* @return 
	*/ 
	public int deleteRegion(String id);

}

