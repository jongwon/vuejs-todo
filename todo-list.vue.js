var TodoList = Vue.extend({

	props:{
		todoList:{
			type:Array,
			default:function(){
				return [];
			}
		}
	},

	template:`
	<div>
		<div class="todo-list"> 
			<ol>
				<li class="todo"
					v-for="(todo, index) in todoList"
					@click="changeState(index)"
					:class="todo.state"
				>
				 <button @click.stop.prevent="deleteTodo(index)">삭제</button> 
				 {{todo.title}} 
				 <button @click.stop.prevent="editTodo(index)">수정</button> 
				</li>
			</ol>
		</div>
	</div>
	`,

	data:function(){
		return {};
	},

	mounted:function(){
		
		var self = this;
		this.$root.bus.$on('create-done', this.addTodo);
		this.$root.bus.$on('add-todo-list', this.addTodoList);

		$.ajax({
			url:self.$root.ctx+'/test.json',
			dataType:'json'
		}).done(function(list){
			console.log(list);
			self.$root.bus.$emit('add-todo-list', list);
			// Vue.set(self, 'todoList', list);
			// self.todoList = list;
		})
	},

	beforeDestroy:function(){
		this.$root.bus.$off('create-done', this.addTodo);
		this.$root.bus.$off('add-todo-list', this.addTodoList);
	},

	methods:{

		deleteTodo:function(index){
			this.todoList.splice(index, 1);
		},

		editTodo:function(index){
			this.$root.bus.$emit('edit-todo', 
				this.todoList[index], index);
		},

		addTodo:function(todo){
			console.log('addTodo called')
			this.todoList.push(todo);
		},

		addTodoList:function(arr){
			var self = this;
			arr.forEach(function(a){self.todoList.push(a)});
		},

		changeState:function(index){
			var todo = this.todoList[index];
			if(todo.state == 'new'){
				todo.state = 'ing';
			}else if(todo.state == 'ing'){
				todo.state = 'end';
			}else if(todo.state == 'end'){
				todo.state = 'new';
			}
		}
	}

});

Vue.component('todo-list', TodoList);

