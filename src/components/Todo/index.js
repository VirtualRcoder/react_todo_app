import React from 'react';
import {TextField, Container, Checkbox, Divider, Paper, Grid, Button} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';

import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';



export default class Todo extends React.Component{
	constructor(props){
		super(props);
		this.state={
			newTask: "",
			tasks: [],
			value:'recents'
		}
		this.addTask = this.addTask.bind(this)
		this.toggle = this.toggle.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		this.todoFilter = this.todoFilter.bind(this)
	}

	addTask(){
		let newTask = this.state.newTask;
		let tasks = this.state.tasks;
		tasks.push({text:newTask, done:false});
		this.setState({
			newTask:"",
			tasks:tasks,
		})
	}

	toggle(task){
		let {tasks} = this.state;
		tasks[tasks.indexOf(task)].done = !tasks[tasks.indexOf(task)].done
		this.setState({tasks: tasks});
	}

	deleteTask(e){
		let text = e.target.offsetParent.value
		let tasks = this.state.tasks

		tasks = tasks.filter((task)=> task.text!==text)
		this.setState({tasks: tasks})
	}

	todoFilter(e){
		console.log(e.target.textContent)
		this.setState({})
	}

	render(){
		const value = 'recents';
		return (
			<div>
				<Grid
				 container 
				 maxWidth="xs" 
				 spacing={2}
				 style={{justifyContent:"center", alignItems: "center", marginTop:"20px"}}
				>
					<Grid item>
						<TextField
						 label="Add Todo" 
						 variant="outlined"
						 size="small"
						 value={this.state.newTask}
						 onChange={(e)=>{
						 	this.setState({
						 		newTask: e.target.value
						 	})
						 }}
						 />
					</Grid>
					<Grid item>
						<Button
						onClick={this.addTask}
						variant="contained" 
						color="primary">Add Task</Button>
					</Grid>
				</Grid>
				<Container style={{justifyContent:"Center", marginTop:"30px"}} maxWidth="xs">
					<Paper style={{padding: "30px"}}>
					{this.state.tasks.map(task=>(
						<div>
						<Grid container style={{marginTop:"20px",alignItems:"center"}}>
						<Grid item xs={1}>
						<Checkbox 
						onChange={()=> this.toggle(task)} 
						checked={task.done} 
						name="gilad"
						color="primary"
						/>
						</Grid>
						<Grid item xs={5}>
						<span style={task.done?{textDecoration:"line-through",opacity:"0.5"}:{}}>{task.text}</span>
						</Grid>
						<Grid item xs={6}>
						<Button
        				variant="contained"
        				color="secondary"
        				size="small"
        				value={task.text}
        				startIcon={<DeleteIcon />}
        				onClick={this.deleteTask}
        				>
        				Delete
      					</Button>
						</Grid>
						<Divider variant="middle"/>
						</Grid>
						</div>
					))}
					</Paper>
					<BottomNavigation value={this.state.value} onChange={this.todoFilter}>
					  <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
					  <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
					</BottomNavigation>
				</Container>
			</div>
			)
	}
} 
