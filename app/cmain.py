import lib.c24hc_main as c24hc_main

def main():
    data = c24hc_main.main(root_file=__file__)
    res = data.get_cheapest_offers()
    print('res ', res)

if __name__ == '__main__':
    main()
