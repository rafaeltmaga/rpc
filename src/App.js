import React, { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import axios from 'axios';

import InputMask from 'react-input-mask';
import Container from './styles';
import { sortAndGroup } from './utils';

export default function() {
	const [ date, setDate ] = useState(moment().format('DD/MM/YYYY'));
	const [ list, setList ] = useState([]);

	const formatDate = (date) => {
		const splitDate = date.split('/');
		return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
	};
	const handleFetchSchedule = useCallback(async (date) => {
		try {
			const res = await axios({
				url: `https://cors-anywhere.herokuapp.com/https://epg-api.video.globo.com/programmes/1337?date=${formatDate(
					date
				)}`,
				method: 'GET'
			});
			console.log(res.data.programme.entries[0]);
			console.log(res.data.programme.entries[0].title);

			if (res.status === 200) {
				const newList = res.data.programme.entries.map((item) => {
					return {
						programa: {
							id: item.media_id,
							name: item.title,
							time_start: moment(item.human_start_time, 'HH:mm:ss Z').format('HH:mm'),
							time_end: moment(item.human_end_time, 'HH:mm:ss Z').format('HH:mm')
						}
					};
				});
				console.log(newList);
				return setList(sortAndGroup(newList));
			}

			setList([]);
		} catch (e) {
			alert('Data inválida');
		}
	}, []);

	useEffect(
		() => {
			if (date.length === 10) {
				handleFetchSchedule(date);
			}
		},
		[ handleFetchSchedule, date ]
	);

	return (
		<Container>
			<header>
				<img src="/logo-rpc.png" alt="Logo RPC " className="logo-rpc" />
				<img src="/logo-da-globo.png" alt="Logo GLobo " className="logo-da-globo" />
				<h1>Programação diária RPC</h1>
			</header>
			<body>
				<div className="date">
					<p>Digite a data a ser pesquisada:</p>
					<InputMask
						mask="99/99/9999"
						alwaysShowMask={true}
						maskChar=""
						className="date__input"
						type="text"
						id="date"
						name="date"
						value={date}
						onChange={(event) => setDate(event.target.value)}
					/>
				</div>
				{list.length > 0 ? (
					<ul className="schedule">
						{list.map((item) => (
							<li className="schedule__network" key={item.id}>
								<ul className="schedule__shows">
									<h3>{item.name}</h3>
									<li className="schedule__show" key={item.media_id}>
										{item.time_start} - {item.time_end}
									</li>
								</ul>
							</li>
						))}
					</ul>
				) : (
					<div className="empty_schedule">Nenhuma programação encontrada para este dia</div>
				)}
			</body>
		</Container>
	);
}
