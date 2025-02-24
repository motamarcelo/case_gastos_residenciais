export default function Table() {
	return (
		<div className="overflow-x-auto bg-zinc-200 rounded-xl">
			<table className="table">
				{/* head */}
				<thead>
					<tr className="text-black text-xl">
						<th></th>
						<th>Name</th>
						<th>Age</th>
						<th>Receitas</th>
						<th>Despesas</th>
						<th>Saldo</th>
					</tr>
				</thead>
				<tbody className="text-lg font-semibold">
					{/* row 1 */}
					<tr className="hover:bg-zinc-400 cursor-pointer">
						<th>1</th>
						<td>Cy Ganderton</td>
						<td>Quality Control Specialist</td>
						<td>Blue</td>
						<td>Blue</td>
						<td>Blue</td>
					</tr>
					{/* row 2 */}
					<tr className="hover:bg-zinc-400 cursor-pointer">
						<th>2</th>
						<td>Hart Hagerty</td>
						<td>Desktop Support Technician</td>
						<td>Purple</td>
						<td>Purple</td>
						<td>Purple</td>
					</tr>
					{/* row 3 */}
					<tr className="hover:bg-zinc-400 cursor-pointer">
						<th>3</th>
						<td>Brice Swyre</td>
						<td>Tax Accountant</td>
						<td>Red</td>
						<td>Red</td>
						<td>Red</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
