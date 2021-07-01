

.PHONY: server,web,build,test

APP:=dist

TM_PATH:=/usr/share/nginx/html/shopvill.tm/admin/
HOST:=ru

TEST_PATH:=/usr/share/nginx/html/website/admin
TEST_HOST:=thothbe

com: 
	cp .env.production.tm .env.production
	npm run build:prod
	tar -zcvf $(APP).tar.gz $(APP)
	scp $(APP).tar.gz  root@$(HOST):$(COM_PATH)
	-ssh root@$(HOST) "cd  $(COM_PATH) ; rm -rf $(APP); tar -zxvf $(APP).tar.gz ;rm $(APP).tar.gz"
	rm $(APP).tar.gz
	echo "install"

tm: 
	cp .env.production.tm .env.production
	npm run build:prod
	tar -zcvf $(APP).tar.gz $(APP)
	scp $(APP).tar.gz  root@$(HOST):$(TM_PATH)
	-ssh root@$(HOST) "cd  $(TM_PATH) ; rm -rf $(APP); tar -zxvf $(APP).tar.gz ;rm $(APP).tar.gz"
	rm $(APP).tar.gz
	echo "install"

test:
	cp .env.production.thothbe .env.production
	npm run build:prod
	tar -zcvf $(APP).tar.gz $(APP)
	scp $(APP).tar.gz  root@$(TEST_HOST):$(TEST_PATH)
	-ssh root@$(TEST_HOST) "cd  $(TEST_PATH) ; rm -rf $(APP); tar -zxvf $(APP).tar.gz ;rm $(APP).tar.gz"
	rm $(APP).tar.gz
	echo "install"

	