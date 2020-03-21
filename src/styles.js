import styled from 'styled-components';

export default styled.div`
	box-sizing: border-box;
	width: 100%;
	font-family: 'Montserrat', sans-serif;
	padding: 40px;
	text-align: center;
	background-color: #fff;

	h1 {
		font-size: 3em;
		color: #fff;
	}

	.logo-rpc {
		float: left;
		padding: 3px;
	}

	.logo-da-globo {
		float: right;
		padding: 3px;
	}

	.date {
		background-color: #393939;
		padding: 15px;
		border-radius: 8px;
		text-align: left;
		color: #ffffff;

		.date__input {
			border: 0;
			outline: none;
			padding: 15px;
			font-size: 16px;
			font-weight: 700;
			border-radius: 8px;
			color: #000000;
		}
	}

	.schedule {
		list-style: none;
		margin: 0;
		padding: 0;
		color: white;
		text-align: left;

		&__network {
			&:nth-child(even) {
				background: #006497;
				&:hover {
					background: #c9c9c9;
					color: red;
				}
			}

			&:nth-child(odd) {
				background: #ec7d00;
				&:hover {
					background: #c9c9c9;
					color: red;
				}
			}
		}

		&__shows {
			list-style: none;
			margin: 0;
			padding: 0;
		}
	}

	header {
		background-color: #006497;
	}

	body {
		background-color: #fff;
	}
`;
