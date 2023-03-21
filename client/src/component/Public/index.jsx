import { Link } from 'react-router-dom'

const Public = () => {
	return (
		<section>
			<h1>Public</h1>
			<ul>
				<li>
					<Link to='/login'>Login</Link>
				</li>
				<li>
					<Link to='/register'>Register</Link>
				</li>
			</ul>
		</section>
	)
}

export default Public
