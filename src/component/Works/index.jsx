import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

async function removeWork(id) {
	await axios.delete(`https://todo-backend-9bmu.onrender.com/api/works/removeWork/${id}`);
}

export const Works = ({ id, title, status }) => {
	const [editing, setEditing] = React.useState(false);
	const [value, setValue] = React.useState(title);

	async function setStatus(status) {
		await axios.patch(`https://todo-backend-9bmu.onrender.com/api/works/status/${id}`, {
			status: !status
		});
	}

	async function eddingWork(title) {
		await axios.patch(`https://todo-backend-9bmu.onrender.com/api/works/updateWork/${id}`, {
			title: title
		});
	}

	const queryClient = useQueryClient();

	const mutationRemove = useMutation(workID => removeWork(workID), {
		onSuccess: () => queryClient.invalidateQueries(["works"])
	});

	const mutationStatus = useMutation(status => setStatus(status), {
		onSuccess: () => queryClient.invalidateQueries(["works"])
	});

	const mutationEdding = useMutation(title => eddingWork(title), {
		onSuccess: () => queryClient.invalidateQueries(["works"])
	});

	const onRemoveWork = () => {
		mutationRemove.mutate(id);
	}

	const toggleStatus = () => {
		mutationStatus.mutate(status);
	}

	const onEddingWork = (value) => {
		mutationEdding.mutate(value);

		setEditing(false);
		setValue(title);
	}

	return (
		editing
			? (
				<div className={`flex justify-between px-4 border-b-[1.5px] border border-gray-400 `}>
					<div className=" flex items-center space-x-3 w-full">
						<input
							type="text"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							className="w-full bg-transparent py-3 text-lg"
						/>
					</div>
					<div className=" flex space-x-3">
						<button type="submit" onClick={() => onEddingWork(value)}>
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
								<path d="M26.636 280.832l51.12-51.090 102.225 102.282-51.12 51.091-102.225-102.282z" fill="#000000" />
								<path d="M179.996 331.976l254.25-254.25 51.12 51.12-254.25 254.25-51.12-51.12z" fill="#000000" />
								<path d="M180.006 434.245l-51.141-51.141 51.12-51.12 51.141 51.141-51.119 51.12z" fill="#000000" />
							</svg>
						</button>
						<button type="button" onClick={() => setEditing(!editing)}>
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
								<path d="M256.010 204.645l100.118-100.146 51.344 51.33-100.118 100.146-51.344-51.329z" fill="#000000" />
								<path d="M155.827 407.483l-51.344-51.358 100.161-100.132 51.344 51.358-100.161 100.132z" fill="#000000" />
								<path d="M407.498 356.112l-51.373 51.358-100.118-100.146 51.373-51.358 100.118 100.146z" fill="#000000" />
								<path d="M104.502 155.857l51.337-51.351 100.153 100.125-51.337 51.351-100.153-100.125z" fill="#000000" />
								<path d="M255.983 307.36l-51.351-51.365 51.365-51.351 51.351 51.365-51.365 51.351z" fill="#000000" />
							</svg>
						</button>
					</div>
				</div>)
			: (<div className={`flex justify-between px-4 py-3 border-b-[1.5px] border border-gray-400 ${status ? 'bg-gray-300' : ''}`}>
				<div className="flex items-center">
					<input
						type="checkbox"
						defaultChecked={status}
						onClick={() => toggleStatus()}
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
					<label htmlFor="inline-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</label>
				</div >
				<div className='flex items-center gap-3'>
					<button
						className="w-[32px] bg-[#04AF70] hover:bg-[#027148] font-bold p-1 rounded inline-flex items-center justify-center"
						onClick={() => setEditing(!editing)}
					>
						<svg className="feather feather-edit" fill="none" height="20" stroke="#f6f6f6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
					</button>
					<button
						className="w-[32px] bg-[#BF0000] hover:bg-[#800000] font-bold p-1 rounded inline-flex items-center justify-center"
						onClick={() => onRemoveWork()}
					>
						<svg viewBox="0 0 448 512" fill="#f6f6f6" height="20" xmlns="http://www.w3.org/2000/svg">
							<path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" /></svg>
					</button>
				</div>
			</div >)
	)
}
