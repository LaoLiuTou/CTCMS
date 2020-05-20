package com.ctcms.service.region;
import java.util.List;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import com.ctcms.dao.region.IRegionMapper;
import com.ctcms.model.region.Region;
public class RegionServiceImpl  implements IRegionService {

	@Autowired
	private IRegionMapper iRegionMapper;
	/**
	* 通过id选取
	* @return
	*/
	public Region selectRegionById(String id){
		return iRegionMapper.selectregionById(id);
	}

	/**
	* 通过查询参数获取信息
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public List<Region> selectRegionByParam(Map paramMap){ 
		return iRegionMapper.selectregionByParam(paramMap);
	}
	public List<Region> statisRegion(){ 
		return iRegionMapper.statisregion();
	}

	/**
	* 通过查询参数获取总条数
	* @return
	*/ 
	@SuppressWarnings("rawtypes")
	public int selectCountRegionByParam(Map paramMap){ 
		return iRegionMapper.selectCountregionByParam(paramMap);
	}

	/**
	* 更新 
	* @return 
	*/ 
	@Transactional
	public  int updateRegion(Region region){
		return iRegionMapper.updateregion(region);
	}

	/**
	* 添加 
	* @return
	*/ 
	@Transactional
	public  int addRegion(Region region){
		return iRegionMapper.addregion(region);
	}

	/**
	* 批量添加 
	* @return
	*/ 
	@Transactional
	public  int muladdRegion(List<Region> list){
		return iRegionMapper.muladdregion(list);
	}

	/**
	* 删除 
	* @return 
	*/ 
	@Transactional
	public  int deleteRegion(String id){
		return iRegionMapper.deleteregion(id);
	}

}

