class Social {
	public static googleCallback(req, res): any {
		return res.redirect('/account');
	}
}

export default Social;
