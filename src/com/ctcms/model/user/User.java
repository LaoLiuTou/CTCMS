package com.ctcms.model.user;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;
/**
 * @author LT
 */
public class User {

	/** 用户  */
	private  Long id;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	/**  */
	private  String username;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	/**  */
	private  String password;
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	/** 昵称 */
	private  String nickname;
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	/** 备注 */
	private  String comment;
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	/** 角色  0：管理 1：单位 */
	private  Long role;
	public Long getRole() {
		return role;
	}
	public void setRole(Long role) {
		this.role = role;
	}
	/** 新建审核 0：未 1：审核 */
	private  Long new_flag;
	public Long getNew_flag() {
		return new_flag;
	}
	public void setNew_flag(Long new_flag) {
		this.new_flag = new_flag;
	}
	/** 修改审核0：未 1：审核 */
	private  Long update_flag;
	public Long getUpdate_flag() {
		return update_flag;
	}
	public void setUpdate_flag(Long update_flag) {
		this.update_flag = update_flag;
	}
	/** 冻结  0：未 1：冻结 */
	private  Long frozen_flag;
	public Long getFrozen_flag() {
		return frozen_flag;
	}
	public void setFrozen_flag(Long frozen_flag) {
		this.frozen_flag = frozen_flag;
	}
	/** 创建人id */
	private  Long c_id;
	public Long getC_id() {
		return c_id;
	}
	public void setC_id(Long c_id) {
		this.c_id = c_id;
	}
	/**  */
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private  Date c_dt;
	public Date getC_dt() {
		return c_dt;
	}
	public void setC_dt(Date c_dt) {
		this.c_dt = c_dt;
	}
	/**  */
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private  Date u_dt;
	public Date getU_dt() {
		return u_dt;
	}
	public void setU_dt(Date u_dt) {
		this.u_dt = u_dt;
	}
	/**  */
	private  Long state;
	public Long getState() {
		return state;
	}
	public void setState(Long state) {
		this.state = state;
	}



}
