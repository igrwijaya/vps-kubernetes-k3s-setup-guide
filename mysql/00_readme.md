### Important Notes
The MySQL data will be stored in specific nodes that labeled as workload=data. Please makes sure you can access your nodes.
The backup secret use base64 encoding. Please make sure you have the correct secret. To create a new base64 secret, you can use the following command:
```bash
echo -n 'your-secret' | base64
```

### Access MySQL Remotely
To access MySQL remotely, you need to set up port forwarding. You can do this by running the following command:
```bash
kubectl port-forward svc/mysql 3307:3306 -n core-infrastructure
```
note: 3307 is the local port, and 3306 is the MySQL port in the container.

